import clsx from 'clsx';
import React from 'react';

const ProgressBar = ({ progress }: { progress: number }) => {
    const activeCells = Math.ceil((progress / 100) * 10);

    return (
        <div className='w-40 rounded-md overflow-hidden p-1 gap-1 h-3 grid grid-cols-10'>
            {Array.from({ length: 10 }).map((_, index) => {
                let color = 'bg-gray-200'
                if (index < activeCells) {
                    if (index >= 5 && index <= 7)
                        color = 'bg-orange-500'
                    else if (index > 7)
                        color = "bg-red-500"
                    else color = "bg-green-500"
                }
                return (
                    <div key={index} className={clsx("h-full w-full", color)}></div>
                )
            })}
        </div>
    );
}

export default ProgressBar;
