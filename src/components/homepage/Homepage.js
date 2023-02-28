import React, {useState, useEffect, useRef} from 'react';
import './Homepage.css';

function Homepage() {
    const [word, setWord] = useState("");
    const [btnState, setBtnState] = useState(true);
    const [randomWord, setRandomWord] = useState("");
    const [definition, setDefinition] = useState([]);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchData();
    },[])

    function randomDef(){
        let rurl=`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`;
        console.log("rrrrr", rurl);
    fetch(
        rurl
    )
    .then((rep) => {
        return rep.json();
        }).then((dDef) => {
            setDefinition(dDef);
            console.log("ddddeffff", dDef);
        });
    }

    function submitData(e){
        if(e.target.name === "word")
        {
            setWord(() => (e.target.value));
        }
    }
    useEffect(() => {
        if (word !== ""){
            setBtnState(false);
        }
        else{
            setBtnState(true);
        }
    }, [word])
    function fetchData(){
        fetch(
            "https://random-word-api.herokuapp.com/word"
        )
            .then((resp) => {
            return resp.json();
            })
            .then((data) => {
                setRandomWord(data);
                return data;
            });
            // randomDef(randomWord);
    }

    function dataDefinition(){
        let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        fetch(
            url
        )
        .then((ans) => {
            return ans.json();
            }).then((definition) => {
                setDefinition(definition);
                console.log("ddddd", definition);
            });
    }
   
  return (
    <>
        <div className='homemain'>
            <header className='homehead'>
                <input type="text" 
                placeholder='Enter your word' 
                value={word} 
                onChange={submitData} 
                className="hometext"
                name="word"
                />
                <input type="submit" 
                    name="search" 
                    placeholder="Search" 
                    value="Search" 
                    className="homesearch" 
                    // disabled={btnState}
                    onClick={dataDefinition}
                    />
            </header>
            <div className='wordofday'>
                <h4>{randomWord}</h4>
                {/* <p>{definition}</p> */}
            </div>
        </div>
    </>
  )
}

export default Homepage


