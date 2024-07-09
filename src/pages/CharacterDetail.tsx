import { useEffect, useState } from "react";
import People from "../interface/People";
import { useParams } from "react-router-dom";
import { fetchAllCharacterFilms, fetchData } from "../api/ApiHelper";
import { ENDPOINT } from "../Constants";
import './style.css';
import Planet from "../interface/Planet";
import Film from "../interface/Film";

const CharacterDetail: React.FC = () => {

    const { personId } = useParams<{ personId: string }>();
    const [people, setPeople] = useState<People>();
    const [planet, setPlanet] = useState<Planet>();
    const [films, setFilms] = useState<Film[]>([]);
    const [apiError, setApiError] = useState<string | undefined>(undefined);

    const fetchCharacterData = () => {
        console.log('fetchCharacterData: ', personId)
        fetchData(`${ENDPOINT}/people/${personId}`)
        .then((response) => {
            console.log('res: ', response)
            setPeople((response as People));
        })
        .catch(err => {
            console.log('err: ', err)
            setApiError(err)
        })
    }

    const fetchHomePlanet = () => {
        console.log('fetchHomePlanet: ')
        fetchData(people?.homeworld ?? '')
        .then((response) => {
            console.log('res: ', response)
            setPlanet((response as Planet));
        })
        .catch(err => {
            console.log('err: ', err)
            setApiError(err)
        })
    }

    const fetchCharacterFilms = () => {
        console.log('fetchCharacterFilms: ');
        if (!people?.films) {
            return false;
        }
        fetchAllCharacterFilms(people?.films)
        .then((response) => {
            console.log('fetchAllCharacterFilms: ', response)
            setFilms(response as Film[]);
        })
        .catch(err => {
            console.log('err: ', err)
            setApiError(err)
        })
    }

    useEffect(() => {
        fetchCharacterData()
    }, [])

    useEffect(() => {
        if (people) {
            // fetch home planet
            fetchHomePlanet();

            // fetch films
            fetchCharacterFilms();
        }
    }, [people])


    return (
        <div className='main-container'>
            <div className="character-details">
                <h3>{people?.name}</h3>
                <div className="grid">
                    <div className="grid-item">
                        <span className='card-item'>
                            <span className='character-label'>
                                Hair color:
                            </span>
                            <span className='character-value'>{people?.hair_color}</span>
                        </span>
                    </div>
                    <div className="grid-item">
                        <span className='card-item'>
                            <span className='character-label'>
                                Eye color:
                            </span> 
                            <span className='character-value'>{people?.eye_color}</span>
                        </span>
                    </div>
                    <div className="grid-item">
                        <span className='card-item'>
                            <span className='character-label'>
                                Gender:
                            </span> 
                            <span className='character-value'>{people?.gender}</span>
                        </span>
                    </div>
                    <div className="grid-item">
                        <span className='card-item'>
                            <span className='character-label'>
                                Home planet:
                            </span> 
                            <span className='character-value'>{planet?.name}</span>
                        </span>
                    </div>
                    <div className="grid-item">
                        <span className='card-item'>
                            <span className='character-label'>
                                Films:
                            </span> 
                            <span className='character-value'>
                                <ul>
                                    {
                                        films.map(film => (
                                            <li key={film.title}>{film.title}</li>
                                        ))
                                    }
                                </ul>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            {
                apiError && <div>{apiError}</div>
            }
        </div>
    )
  };
  
  export default CharacterDetail;