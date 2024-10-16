import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase, signIn as supabaseSignIn } from '../lib/supabaseClient';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/');
      }
    };
    checkSession();
  }, [router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await supabaseSignIn(email, password);
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
        <style>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .float { animation: float 6s ease-in-out infinite; }
        `}</style>
      </Head>
      <div className="min-h-screen flex">
        {/* Left side - Illustration */}
        <div className="hidden lg:flex w-1/2 bg-indigo-100 justify-center items-center">
          <svg className="w-3/4 h-3/4" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M489.5 226.499C328 231.632 280 346.999 269 409.499C255.91 434.256 249.85 459.971 250.5 486C251.15 512.029 258.5 538.499 272.5 564.499C291.404 599.694 320.5 622.999 329 626.499C337.5 629.999 319 609.499 337.5 564.499C356 519.499 393.5 509.499 413 495.999C432.5 482.499 454 463.499 470.5 423.499C487 383.499 491.5 344.499 487 329.999C482.5 315.499 489.5 226.499 489.5 226.499Z" fill="#6366F1"/>
            <path d="M739 386C749.127 366.949 748.5 283.5 643 240C537.5 196.5 394.5 226.5 394.5 226.5C394.5 226.5 409.5 190.5 469.5 179.5C529.5 168.5 570.5 170.5 604.5 179.5C638.5 188.5 739 218 739 386Z" fill="#6366F1"/>
            <path d="M403 226.5C403 226.5 494.5 171.5 597.5 225C700.5 278.5 712 362.5 712 362.5C712 362.5 742.5 366 765 392.5C787.5 419 765 485.5 765 485.5C765 485.5 827 531 850.5 594.5C874 658 851.5 726.5 833 782C814.5 837.5 814.5 819 805 829.5C795.5 840 778 837.5 762.5 851.5C747 865.5 751.5 873.5 729 879.5C706.5 885.5 684.5 855 684.5 855C684.5 855 693 831 671.5 811.5C650 792 609 765 587.5 765C566 765 554 785 526.5 785C499 785 493 765 441 765C389 765 356.5 786 356.5 786C356.5 786 334 751.5 321.5 667.5C309 583.5 321 547 321 547C321 547 297 526.5 283.5 485.5C270 444.5 278.5 363.5 340 321C401.5 278.5 403 226.5 403 226.5Z" fill="#818CF8"/>
            <path d="M765 710C765 710 720.5 811.5 691 811.5C661.5 811.5 652.5 762 624.5 762C596.5 762 590.5 781.5 590.5 781.5C590.5 781.5 569.5 752.5 524.5 752.5C479.5 752.5 473 784.5 473 784.5C473 784.5 438 747.5 410.5 747.5C383 747.5 383 784.5 383 784.5C383 784.5 328.5 679 328.5 626.5C328.5 574 356.5 574 356.5 574C356.5 574 358 636.5 400 636.5C442 636.5 449 574 449 574C449 574 465.5 629 497 629C528.5 629 533.5 569 533.5 569C533.5 569 554 626.5 575.5 626.5C597 626.5 609 578.5 609 578.5C609 578.5 635.5 626.5 661 626.5C686.5 626.5 688.5 578.5 688.5 578.5C688.5 578.5 713 633 739 631C765 629 765 710 765 710Z" fill="#6366F1"/>
            <path d="M445 429C445 429 481 475 523.5 475C566 475 578.5 440.5 578.5 440.5C578.5 440.5 609 472 643 470.5C677 469 689.5 437.5 689.5 437.5" stroke="#312E81" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="420" cy="393" r="10" fill="#312E81"/>
            <circle cx="730" cy="405" r="10" fill="#312E81"/>
          </svg>
        </div>
        
        {/* Right side - Sign In Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 px-8 relative overflow-hidden">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  start your 14-day free trial
                </a>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-center text-sm text-red-600">
                {error}
              </div>
            )}
          </div>
          {/* Animated elements */}
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-indigo-500 rounded-full opacity-50 float"></div>
          <div className="absolute top-10 right-10 w-24 h-24 bg-pink-500 rounded-full opacity-50 float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-yellow-500 rounded-full opacity-50 float" style={{animationDelay: '4s'}}></div>
        </div>
      </div>
    </>
  );
}

// Add this to exclude the Layout for the sign-in page
SignIn.getLayout = function getLayout(page) {
  return page;
};