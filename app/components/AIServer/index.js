import AIServerCard from './js/AIServerCard';
import AISearchBar from './js/AISearchBar';
import AIAnswerBoard from './js/AIAnswerBoard';

const AIServer = {
    get AIServerCard() {return AIServerCard},
    get AISearchBar() {return AISearchBar},
    get AIAnswerBoard() {return AIAnswerBoard},
}

module.exports = AIServer;
