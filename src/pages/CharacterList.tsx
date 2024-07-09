import { useEffect, useState } from 'react';
import './style.css';
import { fetchAllHomePlanets, fetchData } from '../api/ApiHelper';
import { ENDPOINT } from '../Constants';
import CharacterCard from '../components/CharacterCard';
import People from '../interface/People'
import PeopleResponse from '../interface/PeopleResponse';
import Planet from '../interface/Planet';

const CharacterList = () => {
    const [peopleResponse, setPeopleResponse] = useState<PeopleResponse>();
    const [apiError, setApiError] = useState<string | undefined>(undefined);
    const [homePlanetMap, setHomePlanetMap] = useState<Record<string, Planet>>({});

    const getPeople = () => {
        console.log('fetchPeople:')
        fetchData(`${ENDPOINT}/people`)
        .then((response) => {
            console.log('res: ', response)
            setPeopleResponse((response as PeopleResponse));
        })
        .catch(err => {
            console.log('err: ', err)
            setApiError(err)
        })
    }

    const fetchHomePlanets = () => {
        console.log('fetchHomePlanets:')
        fetchAllHomePlanets(peopleResponse?.results?.map(item => item.homeworld) ?? [])
        .then((response) => {
            console.log('res: ', response)
            
            setHomePlanetMap((response as Planet[])?.reduce((acc: Record<string, Planet>, item: Planet) => {
                acc[item.url] = item
                return acc;
            }, {}))
        })
        .catch(err => {
            console.log('err: ', err)
            setApiError(err)
        })
    }

    useEffect(() => {
        getPeople()
    }, [])

    useEffect(() => {
        fetchHomePlanets()
    }, [peopleResponse])


    return (
    <div className='main-container'>
        <h3>Character List</h3>
        {
            peopleResponse?.results?.map((item: People) => (
                <CharacterCard key={item.name} data={item} planets={homePlanetMap} />
            ))
        }
        {
            apiError && <div>{apiError}</div>
        }
    </div>
    );
  };
  
  export default CharacterList;