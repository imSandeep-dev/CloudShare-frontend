const CTASection = ({ openSignUp }) => {
    return(
        <div className="bg-purple-500">
            <div className="mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8 lg:py-16 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    <span className="block">Ready to get started?</span>
                    <span className="block">Create your account today.</span>
                </h2>
                <div className="mt-8 flex lg:mt-0 lg:shrink-0">
                    <div className="inline-flex rounded-md shadow">
                        <button 
                            className="inline-flex items-center justify-center rounded-md px-5 py-3 border border-transparent text-base font-medium text-purple-600 bg-white hover:bg-purple-50 transition-colors duration-200"
                            onClick={openSignUp}
                        >
                            Sign Up for free
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CTASection