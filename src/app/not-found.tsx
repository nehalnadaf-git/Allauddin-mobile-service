import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/8 flex items-center justify-center mb-6">
                <span className="font-poppins font-extrabold text-5xl text-primary">?</span>
            </div>
            <h1 className="font-poppins font-extrabold text-7xl md:text-8xl text-deep-text mb-3">404</h1>
            <h2 className="font-poppins font-semibold text-xl md:text-2xl text-deep-text mb-3">
                Page Not Found
            </h2>
            <p className="font-dm text-muted text-base max-w-md mb-8 leading-relaxed">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back to safety.
            </p>
            <Link
                href="/"
                className="px-8 py-3.5 bg-primary hover:bg-hover-blue text-white font-poppins font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 text-sm"
            >
                Back to Home
            </Link>
        </div>
    );
}
