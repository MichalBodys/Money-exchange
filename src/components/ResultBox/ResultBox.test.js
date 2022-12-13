import { cleanup, getByTestId, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';



  describe('Component ResultBox', () => {

    const testCases =[
        {amount: 350},
        {amount: 220},
        {amount: 120},
        {amount: 5},

  ]

  const negativeTestCases=[
    {amount: -100, from: 'PLN', to: 'USD'},
    {amount: -85, from: 'PLN', to: 'USD'},
    {amount: -10, from: 'USD', to: 'PLN'},
    {amount: -11, from: 'USD', to: 'PLN'},
  ]


     it('should render without crashing', () => {
    render (<ResultBox from='PLN' to='USD' amount={100} />);
  });
  it('should render proper info about conversion when PLN -> USD', () => {
    for(const testCase of testCases){
    render(<ResultBox from="PLN" to="USD" amount={testCase.amount} />);
    const output = screen.getByTestId('main-div');
    expect(output).toHaveTextContent(`${formatAmountInCurrency(testCase.amount, 'PLN')} = ${formatAmountInCurrency(testCase.amount / 3.5, 'USD')}`);
    cleanup();
    }
  });
  it('Should render proper info about conversion when USD -> PLN',() => {
    for(const testCase of testCases){
      render (<ResultBox from='USD' to='PLN' amount={testCase.amount}/>);
      const output = screen.getByTestId('main-div');
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testCase.amount, 'USD')} = ${formatAmountInCurrency(testCase.amount * 3.5, 'PLN')}`)
      cleanup()
    }
  })
  it('should render equal info when PLN ->' ,() => {
    for(const testCase of testCases){
      render(<ResultBox from='PLN' to='PLN' amount={testCase.amount}/>);
      const output = screen.getByTestId('main-div')
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testCase.amount, 'PLN')} = ${formatAmountInCurrency(testCase.amount, 'PLN')}`)
      cleanup()
    }
  })
  it('should render "Wrong value..." when value is lower then 0', () => {
    for(const negativeTestCase of negativeTestCases){
      render(<ResultBox from={negativeTestCase.from} to={negativeTestCase.to} amount={negativeTestCase.amount}/>);
      const output = screen.getByTestId('main-div');
      expect(output).toHaveTextContent(`Wrong value...`)
      cleanup()
    }
  })
});