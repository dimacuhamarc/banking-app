import './ControlCard.scss';

export default function ControlCard() {
  return (
    <div className="control-card card">
      <div>
        <button>Deposit</button>
      </div>
      <div>
        <button>Withdraw</button>
      </div>
      <div>
        <button>Transfer</button>
      </div>
    </div>
  );
}