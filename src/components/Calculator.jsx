import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import '../calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [history, setHistory] = useState('');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [previousValue, setPreviousValue] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDot = () => {
    if (!/\./.test(displayValue)) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setHistory('');
  };

  const toggleSign = () => {
    setDisplayValue(displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue);
  };

  const inputPercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate[operator](currentValue, inputValue);

      setDisplayValue(String(newValue));
      setPreviousValue(newValue);
      setHistory(`${currentValue} ${operator} ${inputValue} = ${newValue}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = {
    '/': (prev, next) => prev / next,
    '*': (prev, next) => prev * next,
    '+': (prev, next) => prev + next,
    '-': (prev, next) => prev - next,
    '=': (prev, next) => next,
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <Display value={displayValue} history={history} />
        <div className="divider"></div>
        <div className="calculator-keypad">
          <div className="function-keys">
            <Button onClick={clearDisplay}>C</Button>
            <Button onClick={toggleSign}>√</Button>
            <Button onClick={inputPercent}>%</Button>
            <Button onClick={() => performOperation('/')}>/</Button>
          </div>
          <div className="digit-keys">
            {[7, 8, 9].map((digit) => (
              <Button key={digit} onClick={() => inputDigit(digit)}>
                {digit}
              </Button>
            ))}
            <Button onClick={() => performOperation('*')}>×</Button>
            {[4, 5, 6].map((digit) => (
              <Button key={digit} onClick={() => inputDigit(digit)}>
                {digit}
              </Button>
            ))}
            <Button onClick={() => performOperation('-')}>-</Button>
            {[1, 2, 3].map((digit) => (
              <Button key={digit} onClick={() => inputDigit(digit)}>
                {digit}
              </Button>
            ))}
            <Button onClick={() => performOperation('+')}>+</Button>
            <Button className="button-zero" onClick={() => inputDigit(0)}>00</Button>
            <Button onClick={() => inputDigit(0)}>0</Button>
            <Button onClick={inputDot}>,</Button>
            <Button onClick={() => performOperation('=')}>=</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
