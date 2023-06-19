import React, { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { setUncaughtExceptionCaptureCallback } from 'process';



function ViewCitation() {
  const [favori, setFavori] = useState<any>(null)
  const [citation, setCitation] = useState(null);
  const [author, setAuthor] = useState(null);
  const [date, setDate] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => { }, [favori])
  const handleCitationKammellot = async () => {
    await axios.get('https://kaamelott.chaudie.re/api')
      .then(data => {
        const jsonData = (data.data);
        setCitation(jsonData.citation.citation)



      })
      .catch(error => {
        console.log(error)
      });

  };

  const handleCitation = async () => {
    await axios.get('http://localhost:5000/citation/random')
      .then(data => {
        const jsonData = (data.data);
        setId(jsonData.id)
        setCitation(jsonData.citation)
        setAuthor(jsonData.author)
        setDate(jsonData.createdAt)
        setFavori(jsonData.favori == undefined ? null : jsonData.favori)
      })
      .catch(error => {
        console.log(error)
      });

  };

  const handleFavori = () => {
    axios.put('http://localhost:5000/citation/favori', { favori: !favori, citationId: id })
      .then(data => {
        const jsonData = (data.data);
        console.log(jsonData[0])
        setFavori(!favori)
      })
      .catch(error => {
        console.log(error)
      });

  };
  return (
    <div>
      <Typography style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0 20px 0',
        fontWeight: 'bold',
        fontSize: '60px'
      }}>Citations</Typography>
      <div style={{
        display: 'inline-flex',
        flexDirection: 'column',
        border: '5px solid #6203AD',
        borderRadius: "30px",
        padding: '40px',

      }}>
        <Typography style={{
          margin: '30px 150px 0 150px',
          color: '#6203AD',
          fontSize: '30px',
          fontFamily: 'Inter',
          fontWeight: 'bold',
          lineHeight: '36px'

        }}>{citation == null ? 'Selectioner une citation' : citation}</Typography>
        <Typography style={{
          color: '#6203AD',
          fontSize: '22px',
          fontFamily: 'Inter',
          fontStyle: 'italic',
          textAlign: 'right',
          margin: '5px'
        }}>{author == null ? '' : author}</Typography>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 'bold',
          alignItems: 'center',

        }}>
          {favori ? <StarBorderIcon style={{ color: '#6203AD', marginRight: '5px' }}></StarBorderIcon> : ''}
          <Typography style={{
            color: '#6203AD',
            fontSize: '21px',
            fontFamily: 'Inter',
            textDecoration: 'underline',
            fontWeight: 'bold'
          }} onClick={handleFavori} >Mettre en favoris</Typography>
        </div>
      </div>
      <div style={{ margin: '41px' }}>
        <Typography style={{
          display: 'flex',
          margin: '20px',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '25px'
        }}>Afficher une autre citation </Typography>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button style={{ background: 'white', borderRadius: '15px', padding: '16px 16px 16px 16px', marginRight: '17px' }} onClick={handleCitation}>
          <Typography style={{
            color: '#6203AD',
            fontSize: '21px',
            fontWeight: 'bold',
            textTransform: 'none'
          }}> <VisibilityIcon style={{ color: '#6203AD', marginRight: '5px' }} />Parmi mes citations</Typography>
        </Button>
        <Button style={{ background: 'white', borderRadius: '15px', padding: '16px 16px 16px 16px' }}
          onClick={handleCitationKammellot}>
          <Typography style={{
            color: '#6203AD',
            fontSize: '21px',
            fontWeight: 'bold',
            textTransform: 'none'
          }}><VisibilityIcon style={{ color: '#6203AD', marginRight: '5px' }} />Parmi les citations de Kammeloot</Typography>
        </Button>
      </div>
    </div>
  );
}



export default ViewCitation;
