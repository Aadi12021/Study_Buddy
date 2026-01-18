import { Brain, BookOpen, FileText, CheckCircle2 } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Menu({ onSelectMode, questions = [], flashcards = [] }) {
    return (
        <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">

            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Ready to Study! <span className="text-2xl ml-2">🎉</span>
                </h2>
                <p className="text-gray-600 text-lg">
                    We&apos;ve generated your study materials from the notes provided.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <Brain className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
                            <div className="text-sm text-gray-500 font-medium">Quiz Questions</div>
                        </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500 opacity-50" />
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{flashcards.length}</div>
                            <div className="text-sm text-gray-500 font-medium">Flashcards</div>
                        </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500 opacity-50" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => onSelectMode('quiz')}
                    className="group relative overflow-hidden bg-white p-8 rounded-2xl border-2 border-blue-50 hover:border-blue-500 hover:shadow-xl transition-all duration-300 text-left"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Brain className="w-24 h-24 text-blue-500 transform rotate-12 translate-x-4 -translate-y-4" />
                    </div>
                    <div className="p-3 bg-blue-500 text-white rounded-xl w-fit mb-6 shadow-md group-hover:scale-110 transition-transform">
                        <Brain className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Start Quiz</h3>
                    <p className="text-sm text-gray-500">
                        Test your knowledge with multiple choice questions.
                    </p>
                </button>

                <button
                    onClick={() => onSelectMode('flashcards')}
                    className="group relative overflow-hidden bg-white p-8 rounded-2xl border-2 border-indigo-50 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 text-left"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen className="w-24 h-24 text-indigo-500 transform rotate-12 translate-x-4 -translate-y-4" />
                    </div>
                    <div className="p-3 bg-indigo-500 text-white rounded-xl w-fit mb-6 shadow-md group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Flashcards</h3>
                    <p className="text-sm text-gray-500">
                        Memorize key concepts with flip cards.
                    </p>
                </button>

                <button
                    onClick={() => onSelectMode('input')}
                    className="group relative overflow-hidden bg-gray-50 p-8 rounded-2xl border-2 border-transparent hover:border-gray-300 hover:bg-white hover:shadow-lg transition-all duration-300 text-left"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <FileText className="w-24 h-24 text-gray-600 transform rotate-12 translate-x-4 -translate-y-4" />
                    </div>
                    <div className="p-3 bg-gray-200 text-gray-700 rounded-xl w-fit mb-6 group-hover:bg-gray-800 group-hover:text-white transition-colors">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">New Notes</h3>
                    <p className="text-sm text-gray-500">
                        Discard current session and start over.
                    </p>
                </button>
            </div>
        </div>
    );
}

Menu.propTypes = {
    onSelectMode: PropTypes.func.isRequired,
    questions: PropTypes.array,
    flashcards: PropTypes.array
};
