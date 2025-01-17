import { Bytes, setDoc } from "firebase/firestore";
import { ApiFunction, useApiState } from "hooks/useApiState";
import {
  constructPublicNotesLocationDocPath,
  getPublicNotesLocationDoc,
} from "./_getRef";
import { firebaseAuth } from "config/firebase.config";

interface Params {
  worldId: string;
  locationId: string;
  notes: Uint8Array;
  isBeacon?: boolean;
}

export const updateLocationNotes: ApiFunction<Params, boolean> = (params) => {
  const { worldId, locationId, notes, isBeacon } = params;

  return new Promise((resolve, reject) => {
    if (isBeacon) {
      const contentPath = `projects/${
        import.meta.env.VITE_FIREBASE_PROJECTID
      }/databases/(default)/documents${constructPublicNotesLocationDocPath(
        worldId,
        locationId
      )}`;

      const token = (firebaseAuth.currentUser?.toJSON() as any).stsTokenManager
        .accessToken;
      if (notes) {
        fetch(
          `https://firestore.googleapis.com/v1/${contentPath}?updateMask.fieldPaths=notes`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: contentPath,
              fields: {
                notes: {
                  bytesValue: Bytes.fromUint8Array(notes).toBase64(),
                },
              },
            }),
            keepalive: true,
          }
        ).catch((e) => console.error(e));
      }

      resolve(true);
    } else {
      setDoc(
        getPublicNotesLocationDoc(worldId, locationId),
        { notes: Bytes.fromUint8Array(notes) },
        { merge: true }
      )
        .then(() => {
          resolve(true);
        })
        .catch((e) => {
          console.error(e);
          reject("Failed to save note updates.");
        });
    }
  });
};

export function useUpdateLocationNotes() {
  const { call, ...rest } = useApiState(updateLocationNotes);

  return {
    updateLocationNotes: call,
    ...rest,
  };
}
