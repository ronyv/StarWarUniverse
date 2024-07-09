import { useNavigate } from 'react-router-dom';
import People from '../interface/People';
import './style.css'
import { getLastPathParam } from '../CommonUtils';
import Planet from '../interface/Planet';

interface CharacterCardProps {
    data: People;
    planets: Record<string, Planet>;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ data, planets }) => {

    const navigate = useNavigate();

    const goToDetailPage = () => {
        navigate(`/${getLastPathParam(data.url)}/details`)
    }

    return (
        <div className='character-card' onClick={goToDetailPage}>
            <span className='card-item'><strong>{data.name}</strong></span>
            <span className='card-item'><span className='card-label'>Gender:</span> <b>{data.gender}</b></span>
            <span className='card-item'><span className='card-label'>Home planet:</span> <b>{planets[data.homeworld]?.name ?? ''}</b></span>
        </div>
    );
  };
  
  export default CharacterCard;