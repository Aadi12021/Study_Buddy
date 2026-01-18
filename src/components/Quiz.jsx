import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Menu as MenuIcon, Trophy } from 'lucide-react';

export default function Quiz({ questions, onExit }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    const currentQ = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;

    // Reset state when questions change
    useEffect(() => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
        setIsAnswered(false);
    }, [questions]);

    const handleAnswerClick = (index) => {
        if (isAnswered) return;

        setSelectedAnswer(index);
        setIsAnswered(true);

        if (index === currentQ.correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            setShowResult(true);
        } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        }
    };

    const retryQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
        setIsAnswered(false);
    };

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);

        return (
            <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 text-center">
                    <div className="mb-6 inline-flex p-4 rounded-full bg-yellow-50 text-yellow-500 mb-6 shadow-sm">
                        <Trophy className="w-16 h-16" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                    <p className="text-gray-500 mb-8">Here&apos;s how you performed</p>

                    <div className="text-5xl font-black text-blue-600 mb-2">
                        {percentage}%
                    </div>
                    <p className="text-gray-600 mb-8 font-medium">
                        You got {score} out of {questions.length} questions correct
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={retryQuiz}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Retake Quiz
                        </button>
                        <button
                            onClick={onExit}
                            className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                        >
                            <MenuIcon className="w-5 h-5" />
                            Back to Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Fallback if no questions
    if (!questions || questions.length === 0) {
        return (
            <div className="text-center p-10">
                <p>No questions available. Please regenerate.</p>
                <button onClick={onExit} className="mt-4 text-blue-600 hover:underline">Go Back</button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onExit}
                    className="text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2 transition"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Quit Quiz
                </button>
                <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                    Question {currentQuestion + 1} of {questions.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-200 rounded-full mb-8 overflow-hidden">
                <div
                    className="h-full bg-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                ></div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10 mb-8 animate-in slide-in-from-right-8 duration-500 key={currentQuestion}">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                    {currentQ.question}
                </h2>

                <div className="space-y-4">
                    {currentQ.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === currentQ.correct;
                        const showCorrectness = isAnswered;

                        let buttonStyle = "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-blue-300 text-gray-700";
                        let icon = null;

                        if (showCorrectness) {
                            if (isCorrect) {
                                buttonStyle = "bg-green-50 border-green-500 text-green-700 font-medium";
                                icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
                            } else if (isSelected && !isCorrect) {
                                buttonStyle = "bg-red-50 border-red-500 text-red-700 opacity-50";
                                icon = <XCircle className="w-5 h-5 text-red-500" />;
                            } else {
                                buttonStyle = "bg-gray-50 border-gray-200 opacity-50"; // Dim unselected options
                            }
                        } else if (isSelected) {
                            // Should not happen as we disable click after selection, 
                            // but purely for state logic before 'isAnswered' is set (if async)
                            buttonStyle = "bg-blue-50 border-blue-500 text-blue-900";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(index)}
                                disabled={isAnswered}
                                className={`w-full p-5 rounded-xl border-2 text-left flex items-center justify-between transition-all duration-200 ${buttonStyle}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${showCorrectness && isCorrect ? 'bg-green-100 border-green-300 text-green-700' :
                                        showCorrectness && isSelected && !isCorrect ? 'bg-red-100 border-red-300 text-red-700' :
                                            'bg-white border-gray-300 text-gray-500'
                                        }`}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className="flex-1">{option}</span>
                                </div>
                                {icon}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end h-14">
                {isAnswered && (
                    <button
                        onClick={handleNext}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2"
                    >
                        {isLastQuestion ? 'See Results' : 'Next Question'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}

Quiz.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correct: PropTypes.number.isRequired
    })).isRequired,
    onExit: PropTypes.func.isRequired
};
