import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../Firebase/firebase.config";

const Login = () => {
  const [loggedInError, setLoggedInError] = useState(null);
  const [success, setSuccess] = useState(null);
  const emailRef = useRef(null)

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    // RESET SUCCESS AND ERROR
    setLoggedInError('')
    setSuccess('')

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
       
        if(userCredential.user.emailVerified){
            setSuccess("You have successfully logged in");
        }
        else {
            alert('please verify your email address.')
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoggedInError("Invalid email or password");
      });
  };




  const handleResetPassword = () =>{
    const email = emailRef.current.value;
    if(!email){
        console.log('Please Provide an Email', emailRef.current.value)
        return
    }
    else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        console.log('Please write a valid email')
        return;
    }

    sendPasswordResetEmail(auth, email)
   .then( () =>{
    alert('Please Check your email')
   })
   .catch(error =>{
    console.log(error)
   })




  }


//   send validation email



  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  ref={emailRef}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              {loggedInError ? (
                <p className="text-lg text-red-700">{loggedInError}</p>
              ) : (
                <p className="text-lg text-green-700">{success}</p>
              )}
            </form>

            <div className="ml-8 pb-8">
                <h1>New to this website ? Please go to <Link className="underline" to={`/register`}>Register</Link></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
