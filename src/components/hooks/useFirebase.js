
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signOut } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";


// initialize firebase app
initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { ...userCredential, displayName: name };
                setUser(newUser);
                // save user to the database
                saveUser(email, name, 'POST');
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                
                navigate('/');
                window.location.reload();
            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
                window.location.reload();
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const signInWithGoogle = (location, navigate) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                saveUser(user.email, user.displayName, 'PUT');
                setAuthError('');
                const destination = location?.state?.from || '/';
                navigate(destination);
                window.location.reload();
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }

    // observer user state
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth , (user)=> {
           
             if(user){
                 setUser(user)
             } else{
                 setUser({})
             }
             setIsLoading(false)
        })
         return ()=> unsubscribe()
   },[auth])

   
    useEffect(() => {
        fetch(`https://shielded-citadel-62886.herokuapp.com/checkAdmin/${user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data[0]?.role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          });
      }, [user?.email]);
    //   console.log(isAdmin);
    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://shielded-citadel-62886.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        isAdmin,
        isLoading,
        authError,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
    }
}

export default useFirebase;