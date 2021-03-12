import React, { useState, useEffect } from 'react';
import CreateKey from '../CreateKey';
import api from '../../services/api';
// import ImgChave from '../../assets/img/chave.png';

interface Keys {
    number: number
    name: string
}

const Keys: React.FC = () => {

    // const [keys, setKeys] = useState<Keys[]>([]);

    // // // listando as chaves
    // useEffect(() => {
    //     api.get('keys/').then(response => {
    //         setKeys(response.data)
    //     })
    // }, []);

    // async function handleDeleteKey(_keyNumber: number) {
    //     try {
    //         await api.delete(`keys/${_keyNumber}/`)
    //         alert(`Chave ${_keyNumber} deletada com sucesso.`)

    //     } catch (error) {
    //         alert('Erro ao deletar chave, tente novamente.')
    //     }
    // }

    return (


        <div className="row">
            <h1>ok</h1>
            <aside className='col-sm-2 d-flex flex-column align-items-center'>
                {/* BOTÕES */}
                <button
                    id="btn-nova-chave"
                    className="btn btn-info rounded-circle"
                    data-toggle="modal"
                    data-target="#modal-create-key" >
                    <i className="fas fa-plus"></i>
            Nova
            <br />
             Chave
          </button>
                <button
                    id="btn-novo-usuario"
                    className="btn btn-info rounded-circle"
                    data-toggle="modal"
                    data-target="#modal-create-user"
                >
                    <i className="fas fa-plus"></i>
            Novo
            <br />
            Usuário
          </button>
            </aside>

            <main role="main" className="container col-sm-8">
                {/* CHAVES */}
                <div className="my-3 p-3 bg-white rounded shadow-sm ">
                    <h6 className="border-bottom border-gray pb-2 mb-0">  </h6>

                    <div className='row'>
                        <div className="col-lg-12"></div>
                        {/* {keys.map(key => (
                            <div key={key.number} className="col-lg-4 text-center">
                                <img
                                    // src={ImgChave}
                                    className="img-chave"
                                    data-toggle="modal"
                                    data-target={'#modal-0' + key.number}
                                    alt='no_image'
                                />
                                <button onClick={() => handleDeleteKey(key.number)} className="fas fa-times"></button>
                                <h5>{key.name}</h5>
                                <strong>{key.number}</strong>
                                <br />
                                <button className='btn btn-warning btn-rounded' data-toggle="modal" data-target="#modal-create-reservation">Reservar</button>
                            </div>
                        ))} */}
                    </div>

                </div>

                {/* MODALS */}
                {/* <CreateKey /> */}
                {/* <CreateUser /> */}
                {/* <CreateReservation users={users} /> */}

            </main>

        </div>
    )
}

export default Keys;