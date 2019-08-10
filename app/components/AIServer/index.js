import AIServerCard from './js/AIServerCard';
import AISearchBar from './js/AISearchBar';
import AIAnswerBoard from './js/AIAnswerBoard';
import AIDataBoard from './js/AIDataBoard';

const AIServer = {
    get AIServerCard() {return AIServerCard},
    get AISearchBar() {return AISearchBar},
    get AIAnswerBoard() {return AIAnswerBoard},
    get AIDataBoard() {return AIDataBoard},
}

module.exports = AIServer;
