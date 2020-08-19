import mainState from '../../app/ui/config/store/reducers/MainState';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from '../../app/ui/config/store/actions/MainState';

describe('reducers', () => {
  describe('mainState', () => {
    it('should handle initial state', () => {
      expect(mainState(undefined, {})).toMatchSnapshot();
    });

    it('should handle INCREMENT_COUNTER', () => {
      expect(mainState(1, { type: INCREMENT_COUNTER })).toMatchSnapshot();
    });

    it('should handle DECREMENT_COUNTER', () => {
      expect(mainState(1, { type: DECREMENT_COUNTER })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(mainState(1, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
