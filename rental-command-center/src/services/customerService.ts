import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
}

const customersCollection = collection(db, 'customers');

export const getCustomers = async (): Promise<Customer[]> => {
  const snapshot = await getDocs(customersCollection);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || '',
      phone: data.phone || '',
      email: data.email || '',
      address: data.address || '',
      createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
    };
  });
};

export const addCustomer = async (data: Omit<Customer, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(customersCollection, {
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
  });
  return docRef.id;
};

export const updateCustomer = async (id: string, data: Partial<Omit<Customer, 'id' | 'createdAt'>>): Promise<void> => {
  const docRef = doc(db, 'customers', id);
  await updateDoc(docRef, data);
};

export const deleteCustomer = async (id: string): Promise<void> => {
  const docRef = doc(db, 'customers', id);
  await deleteDoc(docRef);
};
