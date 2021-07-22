import React, { useState } from 'react'
import { db } from '../Firebase/config';

const useFireStore = (collection, condition) => {

    const [documents, setDocuments] = useState([]);

    React.useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createAt');
       
        if(condition) {
            if(!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            collectionRef.where(condition.feildName, condition.operator, condition.compareValue);
        }

        const unsubcribed = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setDocuments(documents);
        });

       return unsubcribed;
    }, [collection, condition]);

    return documents;
};

export default useFireStore;
