type BingoCardProps = {
    number: number;
    highlighted?: boolean;
  };
  
  const BingoCard: React.FC<BingoCardProps> = ({ number, highlighted }) => {
    return (
      <div className={`p-5 m-5 border rounded-lg shadow-lg ${highlighted ? 'bg-green-200' : ''}`}>
        {number}
      </div>
    );
  };
  
  export default BingoCard;
  