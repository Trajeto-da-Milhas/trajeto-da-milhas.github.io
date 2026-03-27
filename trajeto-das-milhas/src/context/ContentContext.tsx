import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { SiteContent } from '../types';
import { defaultContent } from '../data/defaultContent';
import { db, auth } from '../firebase';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => Promise<void>;
  user: User | null;
  isAuthReady: boolean;
  isContentReady: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);

  // Listen for Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Listen for Content changes from Firestore
  useEffect(() => {
    console.log("Iniciando monitoramento do Firestore...");
    const contentDoc = doc(db, 'content', 'main');
    
    const unsubscribe = onSnapshot(contentDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as SiteContent;
        console.log("Dados recebidos do Firestore:", data);
        setContent(data);
        setIsContentReady(true);
      } else {
        console.log("Nenhum dado encontrado no Firestore, usando padrão.");
        // Inicializar o banco se estiver vazio
        setDoc(contentDoc, defaultContent)
          .then(() => setIsContentReady(true))
          .catch(err => console.error("Erro ao inicializar Firestore:", err));
      }
    }, (error) => {
      console.error("Erro crítico no Firestore (onSnapshot):", error);
      // Em caso de erro, pelo menos libera o conteúdo padrão para não travar em loading infinito
      setIsContentReady(true);
    });

    return () => unsubscribe();
  }, []);

  const updateContent = async (newContent: SiteContent) => {
    console.log("Salvando conteúdo no Firestore...");
    try {
      const contentDoc = doc(db, 'content', 'main');
      await setDoc(contentDoc, {
        ...newContent,
        updatedAt: new Date().toISOString()
      });
      console.log("Conteúdo salvo com sucesso no Firestore!");
    } catch (error) {
      console.error("Erro detalhado ao salvar no Firestore:", error);
      let errorMessage = "Erro desconhecido.";
      if (error instanceof Error) errorMessage = error.message;
      throw new Error(errorMessage);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, user, isAuthReady, isContentReady }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
