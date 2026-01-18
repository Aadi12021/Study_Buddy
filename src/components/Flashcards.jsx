import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight, RotateCw, MousePointerClick } from 'lucide-react';

export default function Flashcards({ flashcards, onExit }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentCard = flashcards[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === flashcards.length - 1;

    // Reset state when flashcards change
    useEffect(() => {
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [flashcards]);

    const handleNext = () => {
        if (!isLast) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => prev + 1), 150); // Slight delay for smoother feel
        }
    };

    const handlePrev = () => {
        if (!isFirst) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Fallback if no flashcards
    if (!flashcards || flashcards.length === 0) {
        return (
            <div className="text-center p-10">
                <p>No flashcards available. Please regenerate.</p>
                <button onClick={onExit} className="mt-4 text-blue-600 hover:underline">Go Back</button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onExit}
                    className="text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Menu
                </button>
                <div className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">
                    Card {currentIndex + 1} of {flashcards.length}
                </div>
            </div>

            {/* Card Container */}
            <div
                className="relative w-full aspect-[3/2] cursor-pointer group perspective-1000"
                onClick={handleFlip}
            >
                <div
                    className={`
                relative w-full h-full duration-500 transition-all [transform-style:preserve-3d] ease-in-out
                ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
            `}
                >
                    {/* Front */}
                    <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-3xl shadow-xl border-2 border-indigo-50 p-8 flex flex-col items-center justify-center text-center">
                        <div className="absolute top-6 left-6 text-xs font-bold tracking-wider text-indigo-400 uppercase">
                            Front
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                            {currentCard.front}
                        </h3>

                        <div className="absolute bottom-6 flex items-center gap-2 text-indigo-300 text-sm">
                            <MousePointerClick className="w-4 h-4" />
                            Click to flip
                        </div>
                    </div>

                    {/* Back */}
                    <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-indigo-600 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-center">
                        <div className="absolute top-6 left-6 text-xs font-bold tracking-wider text-indigo-200 uppercase">
                            Back
                        </div>

                        <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                            {currentCard.back}
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-10">
                <button
                    onClick={handlePrev}
                    disabled={isFirst}
                    className={`
            p-4 rounded-full transition-all
            ${isFirst
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-white hover:shadow-md hover:text-indigo-600 bg-gray-100'
                        }
          `}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={handleFlip}
                    className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 active:scale-95 transition"
                >
                    <RotateCw className="w-4 h-4" />
                    Flip Card
                </button>

                <button
                    onClick={handleNext}
                    disabled={isLast}
                    className={`
            p-4 rounded-full transition-all
            ${isLast
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-white hover:shadow-md hover:text-indigo-600 bg-gray-100'
                        }
          `}
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}

Flashcards.propTypes = {
    flashcards: PropTypes.arrayOf(PropTypes.shape({
        front: PropTypes.string.isRequired,
        back: PropTypes.string.isRequired
    })).isRequired,
    onExit: PropTypes.func.isRequired
};
