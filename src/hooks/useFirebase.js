import { useEffect, useState } from "react";
import initiaLizeFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged,signOut,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider} from "firebase/auth";


initiaLizeFirebase()

const useFirebase =()=>{
    const [user,setUser] = useState({});

    const [isLoading,setIsLoading]=useState(true);
    const [authError,setAuthError] = useState('')

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser=(email,password)=>{
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            setAuthError('')
        })
        .catch((error) => {
            const errorCode = error.code;
           setAuthError(error.message)
            // ..
        })
        .finally(()=>setIsLoading(false));
    };


    // observe user state
    useEffect(()=>{
     const unsubscribe=   onAuthStateChanged(auth, (user) => {
            if (user) {
              
              setUser(user)
            } else {
              setUser({})
            }
            setIsLoading(false)
          });
          return ()=>unsubscribe;
    },[])


    // 
    const loginUser=(email,password,location,history)=>{
        setIsLoading(true)
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const destination= location?.state?.from || '/';
        history.replace(destination)
        setAuthError('')
      })
      .catch((error) => {
          setAuthError(error.message);
      })
      .finally(()=>setIsLoading(false));
    };


    //googleSign 
    const signInWithGoogle=()=>{
      setIsLoading(true)
      signInWithPopup(auth, googleProvider)
      .then((result) => {       
        const user = result.user;
        setAuthError('');
      }).catch((error) => {
         setAuthError(error.message)
      })
      .finally(()=>setIsLoading(false));
    }

    const logOut =()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(()=>setIsLoading(false));
    }



    return{
        user,
        isLoading,
        logOut,
        signInWithGoogle,
        loginUser,
        authError,
        registerUser
    }
}

export default useFirebase;