"use client"
import NextTopLoader from 'nextjs-toploader';

const Loader = () => {
    return <NextTopLoader color='hsl(var(--primary))' showSpinner={false} />;
};

export default Loader;