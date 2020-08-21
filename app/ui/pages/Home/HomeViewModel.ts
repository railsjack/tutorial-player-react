import ViewModelBase, { useViewModel } from '../../components/ViewModelBase';

class HomeViewModel extends ViewModelBase {
  count: number;
  constructor() {
    super();
    this.count = 0;
  }
  
  onPressTestButton() {
    this.count++;
    this.updateView();
  }
  
  componentDidMount() {
    console.log('componentDidMount of HomeViewModel')
  }
}

export default useViewModel(new HomeViewModel());
