import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocFromServer,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  Unsubscribe
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export type GameName = 'Anime Guess' | 'Sport Guess';
export type GameMode = 'Classic' | 'Timed' | 'Hard';

export interface ScoreRecord {
  id: string;
  name: string;
  score: number;
  game: GameName;
  mode: GameMode;
  date: string;
  createdAt?: Timestamp | null;
  uid: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid ?? null,
      email: auth.currentUser?.email ?? null,
      emailVerified: auth.currentUser?.emailVerified ?? null,
      isAnonymous: auth.currentUser?.isAnonymous ?? null,
      tenantId: auth.currentUser?.tenantId ?? null,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function subscribeAuth(callback: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}

export async function saveGameScore(params: {
  name: string;
  score: number;
  game: GameName;
  mode: GameMode;
}): Promise<string> {
  const user = auth.currentUser;
  const uid = user && user.emailVerified ? user.uid : 'guest';

  const sanitizedName = params.name.trim().slice(0, 40);
  if (!sanitizedName) {
    throw new Error('Тоглогчийн нэрээ оруулна уу.');
  }

  const safeScore = Math.min(5000, Math.max(0, Math.round(params.score)));
  const validGames: GameName[] = ['Anime Guess', 'Sport Guess'];
  const validModes: GameMode[] = ['Classic', 'Timed', 'Hard'];

  if (!validGames.includes(params.game)) {
    throw new Error('Буруу тоглоомын төрөл.');
  }
  if (!validModes.includes(params.mode)) {
    throw new Error('Буруу тоглоомын горим.');
  }

  const dateStr = new Date().toISOString();
  const path = 'scores';

  try {
    const docRef = await addDoc(collection(db, path), {
      name: sanitizedName,
      score: safeScore,
      game: params.game,
      mode: params.mode,
      date: dateStr,
      createdAt: serverTimestamp(),
      uid,
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeScores(
  onData: (scores: ScoreRecord[]) => void,
  onError: (err: Error) => void
): Unsubscribe {
  const path = 'scores';
  const q = query(
    collection(db, path),
    where('score', '>=', 0),
    orderBy('score', 'desc'),
    limit(100)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const items: ScoreRecord[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: typeof data.name === 'string' ? data.name : 'Тоглогч',
          score: typeof data.score === 'number' ? data.score : 0,
          game: data.game === 'Sport Guess' ? 'Sport Guess' : 'Anime Guess',
          mode:
            data.mode === 'Timed' || data.mode === 'Hard'
              ? data.mode
              : 'Classic',
          date: typeof data.date === 'string' ? data.date : '',
          createdAt: data.createdAt ?? null,
          uid: typeof data.uid === 'string' ? data.uid : '',
        };
      });
      onData(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (wrapped) {
        onError(wrapped instanceof Error ? wrapped : new Error(String(wrapped)));
      }
    }
  );
}

export async function fetchScoresOnce(): Promise<ScoreRecord[]> {
  const path = 'scores';
  const q = query(
    collection(db, path),
    where('score', '>=', 0),
    orderBy('score', 'desc'),
    limit(100)
  );

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: typeof data.name === 'string' ? data.name : 'Тоглогч',
        score: typeof data.score === 'number' ? data.score : 0,
        game: data.game === 'Sport Guess' ? 'Sport Guess' : 'Anime Guess',
        mode:
          data.mode === 'Timed' || data.mode === 'Hard'
            ? data.mode
            : 'Classic',
        date: typeof data.date === 'string' ? data.date : '',
        createdAt: data.createdAt ?? null,
        uid: typeof data.uid === 'string' ? data.uid : '',
      };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function deleteScoreRecord(scoreId: string): Promise<void> {
  const path = `scores/${scoreId}`;
  try {
    await deleteDoc(doc(db, 'scores', scoreId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
