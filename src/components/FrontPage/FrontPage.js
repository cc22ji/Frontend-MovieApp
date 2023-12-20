import img from "../../images/frontpageCover.jpg";
import { useNavigate } from "react-router-dom";


function FrontPage() {
    const Naviagte = useNavigate();

    function UserLogin() {
        Naviagte("/login");
      }
    
      function UserSignUp() {
        Naviagte("/signup");
      }

  return (
    <div>
      <div
        className="bg-cover bg-no-repeat bg-center h-screen"
        style={{ backgroundImage: `url(${img})` }}>
        <div className="flex h-screen items-center">
          <div className="w-1/12 md:w-1/5 lg:w-1/6 bg-none"></div>
          <div className="w-10/12 md:w-3/5 lg:w-2/3 bg-none">
            <div className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Unlimited movies, TV shows and more
            </div>
            <div className="text-center text-white text-xl md:text-2xl lg:text-3xl mb-8 font-semibold">
              Watch anywhere. Cancel anytime.
            </div>
            <div className="text-center text-white text-xl md:text-2xl lg:text-3xl mb-12 font-semibold">
              Ready to watch? Enter your email to create or restart your membership.
            </div>
            <div className="text-center md:flex justify-evenly">
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded w-full md:w-40 h-12 mb-6" onClick={UserLogin}>
                Login
              </button>
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded  h-12 w-full md:w-40" onClick={UserSignUp}>
                SignUp
              </button>
            </div>
          </div>
          <div className="w-1/12 md:w-1/5 lg:w-1/6 bg-none"></div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
