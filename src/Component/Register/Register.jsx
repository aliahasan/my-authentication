import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import auth from "../../Firebase/firebase.config";

const Register = () => {
  const [registerError, setRegisterError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const email = e.target.email.value;
    const password = e.target.password.value;
    const termsCheck = e.target.terms.checked;
    console.log(email, password , termsCheck);

    //RESET ERROR AND SUCCESS
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;

    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one UpperCase characters!"
      );
      return;
    }

    else if (!termsCheck){
        setRegisterError('Please Accept Our Terms and Conditions')
        return;
    }

    // CREATED USER
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setSuccess("User Created Successfully!");

        //Update profile
        updateProfile(userCredential.user, {
            displayName:name,
            photoURL:"https://example.com/jane-q-user/profile.jpg"
        })
        .then(() =>{
            console.log('profile  updated')
        })
        .catch((error =>{
            console.log(error)
        }))

        // send verification email
        sendEmailVerification(userCredential.user)
        .then(()=>{
            alert('please check your email and verify your email')
        })
        .catch()
        

      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative ">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute  left-80 top-12 right-12"
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </span>

                <div className="ml-1 mt-4 relative">
              <input
                className="transform scale-150"
                type="checkbox"
                name="terms"
                id=""
              />
              <label className="ml-3 absolute bottom-[1px]" htmlFor="">
                Accept Our Terms and Conditions
              </label>
            </div>

              </div>
              <div className="form-control mt-2">
                <button className="btn btn-primary">Login</button>
              </div>

              {registerError ? (
                <p className="text-lg text-red-700">{registerError}</p>
              ) : (
                <p className="text-lg text-green-700">{success}</p>
              )}
                <div className="">
                <h1>Already have an account ? Please go to <Link className="underline" to={`/login`}>LogIn</Link></h1>
            </div>
            </form>

          
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
