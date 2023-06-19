import React, { FC, useEffect, useState } from 'react';



import Typography from '@mui/material/Typography';
import { Button, Divider, Icon, Input, InputAdornment, List, ListItem, ListItemText, TextField, Modal, ListItemButton } from '@mui/material';
import Add from '@mui/icons-material/Add'
import axios from 'axios'
import { Create, Delete, TramSharp } from '@mui/icons-material';





function ManageCitation() {

  const [allCitiation, setAllCitation] = useState<any[]>([])
  const [change, setChange] = useState(true)
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [citationId, setCitationId] = useState(null)

  const [filteredCitiation, setFilteredCitiation] = useState<any[]>([]);


  useEffect(() => {

    console.log('r')
    const fetchData = async () => await axios.get('http://localhost:5000/citation/all')
      .then(data => {
        console.log('ici')

        const jsonData = (data.data);
        setAllCitation(jsonData)
        setFilteredCitiation(jsonData);

      })
      .catch(error => {
        console.log(error)
      });

    fetchData();
  }, [change]);


  const filterCitiation = (query: string) => {
    const filtered = allCitiation.filter(
      (citation) =>
        citation.citation.toLowerCase().includes(query.toLowerCase()) ||
        citation.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCitiation(filtered);
  };

  const handleOpen = (id: any) => {
    setCitationId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleInputSearch = (event: any) => {
    filterCitiation(event.target.value)
  };

  const handleSubmit = () => {
    console.log('Input value:', inputValue);
    console.log(citationId)
    if (citationId == null) {
      axios.post('http://localhost:5000/citation', { citation: inputValue, author: 'Vous', favori: 0 })
        .then(data => {
          setChange(!change)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      axios.put('http://localhost:5000/citation', { citation: inputValue, citationId: citationId })
        .then(data => {
          setChange(!change)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setCitationId(null)
    handleClose();
  };


  const handleDelete = (key: any) => {

    axios.delete('http://localhost:5000/citation', { data: { citationId: key } })
      .then(data => {
        setChange(!change)
      })
      .catch(error => {
        console.log(error)
      })

  };

  return (
    <div>
      <Typography style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '10px',
        fontWeight: 'bold',
        fontSize: '40px'
      }}>Mes citations</Typography>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button style={{ background: '#6203AD', borderRadius: '15px', padding: '16px 16px 16px 16px', marginRight: '17px' }} onClick={() => handleOpen(null)}>
          <Typography style={{
            color: 'white',
            fontSize: '21px',
            fontWeight: 'bold',
            textTransform: 'none'
          }}> <Add style={{ color: 'white', marginRight: '5px' }} />Ajouter une citation</Typography>
        </Button>
        <Input
          sx={{ border: '2px solid #6203AD', borderRadius: 1, height: '9vh', width: '805px' }}
          disableUnderline
          placeholder=' Rechercher dans mes citations'
          onChange={handleInputSearch}


        />

      </div>
      <div>
        <List sx={{ marginTop: '20px' }}>
          {filteredCitiation == null ? '' : filteredCitiation.map((citation: any) => (
            <ListItem key={citation.id} style={{ borderBottom: '1px solid grey', borderTop: '1px solid grey', backgroundColor: '#EBEBEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}  >
              <ListItemText primary={citation.citation} />
              <div>
                <Button style={{ width: '15px' }} onClick={() => handleDelete(citation.id)}><Delete></Delete></Button>
                <ListItemButton style={{ width: '15px' }} onClick={() => handleOpen(citation.id)}><Create></Create></ListItemButton>
              </div>

            </ListItem>
          ))}
        </List>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            width: 300,
            padding: 20,
            borderRadius: 5,
          }}
        >
          <TextField
            label="Input"
            value={inputValue}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Ajouter
          </Button>
        </div>
      </Modal>
    </div>

  )
}




export default ManageCitation;
