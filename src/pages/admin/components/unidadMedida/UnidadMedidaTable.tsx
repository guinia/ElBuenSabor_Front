import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Trash, Pencil } from 'react-bootstrap-icons';

import './Table.css'

import UnidadMedida from '../../../../types/unidadMedida';
import UnidadMedidaLayer from '../../../../libs/dataLayerUnidadMedida';

const DeleteUnidadMedidaModal = React.lazy(() => import('./deleteUnidadMedidaModal'));
const SaveUnidadMedidaModal = React.lazy(() => import ('./saveUnidadMedidaModal'))

type UnidadMedidaTableProps = {
    unidades: UnidadMedida[];
};

const emptyUnidadMedida: UnidadMedida = {
    id : 0,
    denominacion : " ",
    abreviatura : " "
};

const UnidadMedidaTable: React.FC<UnidadMedidaTableProps> = ({unidades}) => {
    //State

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = React.useState<any>(null);
    const [listedUnidades, setListedUnidades] = React.useState<UnidadMedida[]>(unidades);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedUnidad, setSelectedUnidad] = React.useState<UnidadMedida | null>(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
    const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

    //Handlers
    const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
    const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
    const onDelete = React.useCallback(() => {
        if(selectedUnidad){
            setShowDeleteModal(false);
            setLoading(true);
            UnidadMedidaLayer.delete.unidad(selectedUnidad.id!)
                .then(() => setListedUnidades((prevState: UnidadMedida[]) => prevState.filter((item: UnidadMedida) => item.id !== selectedUnidad.id)))
                
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => setError(error))
                .finally(() => setLoading(false));
        }
    }, [selectedUnidad, setShowDeleteModal, setListedUnidades, setLoading]);

    const onSave = React.useCallback((i: UnidadMedida) => {
        if (selectedUnidad){
            setShowSaveModal(false);
            setLoading(true);
            if(i.id){
                UnidadMedidaLayer.update.unidad(i)
                    .then((editedUnidad: UnidadMedida) => setListedUnidades((prevState: UnidadMedida[]) => prevState.map((item: UnidadMedida) => item.id === editedUnidad.id ? editedUnidad : item)))
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .catch((error: any) => setError(error))
                    .finally(() => setLoading(false));
            }else {
                //Borrar propiedad id porque es una accion de creacion
                delete i.id;

                UnidadMedidaLayer.create.unidad(i)
                    .then((createdUnidad: UnidadMedida) => {
                        setListedUnidades((prevState: UnidadMedida[]) => [...prevState, createdUnidad]);
                    })
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .catch((error: any) => setError(error))
                    .finally(() => setLoading(false));
            }
        }
    }, [selectedUnidad, setShowSaveModal, setListedUnidades, setLoading]);

    const onShowDeleteModal = React.useCallback((i: UnidadMedida) => {
        setSelectedUnidad(i);
        setShowDeleteModal(true);
    }, [setSelectedUnidad, setShowDeleteModal]);

    const onShowSaveModal = React.useCallback((i?: UnidadMedida) => {
        setSelectedUnidad(i ??  emptyUnidadMedida);
        setShowSaveModal(true);
    }, [setSelectedUnidad, setShowSaveModal])

    //Render
    if (error){
        return(
            <Alert variant="danger">
                {error?.message || 'Algo fue mal mientras buscaba Unidades de medida'}
            </Alert>
        );
    }

    return (
        <React.Suspense fallback={<Spinner animation="border" />}>
        {
            loading
                ? (
                    <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
                        <Spinner animation="border" />
                    </div>
                )
                : (
                    <div className="cuerpote">
                        <Button onClick={() => onShowSaveModal()} style={{ float: 'right', margin: 10 }} variant="primary">Crear Insumo</Button>
                        <Table striped bordered hover >
                            <thead >
                                <tr>
                                    <th>#</th>
                                    <th>Denominacion</th>
                                    <th>Abreviatura</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listedUnidades.map((i: UnidadMedida) => (
                                        <tr key={i.id}>
                                            <td width='2%'>{i.id}</td>
                                            <td width='23%'>{i.denominacion}</td>
                                            <td width='10%'>{i.abreviatura}</td>
                                            <td width='10%' justify-content='space-around'>
                                                <Pencil color="black" onClick={() => onShowSaveModal(i)} size={24} onMouseEnter={() => { document.body.style.cursor = 'pointer'}} onMouseLeave={() => { document.body.style.cursor = 'default'}}></Pencil>
                                                <Trash color="#D32B08" onClick={() => onShowDeleteModal(i)} size={24} onMouseEnter={() => { document.body.style.cursor = 'pointer'}}  onMouseLeave={() => { document.body.style.cursor = 'default'}} ></Trash>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                )
        }
            <DeleteUnidadMedidaModal
                onDelete={onDelete}
                onHide={onCloseDeleteModal}
                unidad = {selectedUnidad}
                show = {showDeleteModal}
            />
            <SaveUnidadMedidaModal
                onSave={onSave}
                onHide={onCloseSaveModal}
                unidad = {selectedUnidad}
                show = {showSaveModal}
            />
        </React.Suspense>
    );

};

export default UnidadMedidaTable;