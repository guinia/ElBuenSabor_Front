import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Trash, Pencil } from 'react-bootstrap-icons';

import '../Table.css';
import ArticuloInsumo from '../../../../types/articuloInsumo';
import DataLayerArticuloInsumo from '../../../../libs/dataLayerArticuloInsumo';

const DeleteInsumoModal = React.lazy(() => import('./DeleteInsumoModal'));
const SaveInsumoModal = React.lazy(() => import('./SaveInsumoModal'));


type InsumosTableProps = {
    insumos: ArticuloInsumo[];
};

const emptyInsumo: ArticuloInsumo = {
    denominacion: '',
    urlImagen: '',
    id: 0,
    precioCompra: 0,
    stockActual: 0,
    stockMinimo: 0,
    // unidadMedida: {
    //     denominacion: '',
    //     abreviatura: 'string',
    //     id: 0,
    // },
    // rubroArticuloInsumo: {
    //     denominacion: '',
    //     id: 0,
    // },

};

const InsumosTable: React.FC<InsumosTableProps> = ({insumos}) => {
    //State

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const[error, setError] = React.useState<any>(null);
    const [listedInsumos, setListedInsumos] = React.useState<ArticuloInsumo[]>(insumos);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedInsumo, setSelectedInsumo] = React.useState<ArticuloInsumo | null>(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
    const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

    //Handlers
    const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
    const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
    const onDelete = React.useCallback(() => {
        if(selectedInsumo){
            setShowDeleteModal(false);
            setLoading(true);
            DataLayerArticuloInsumo.delete.insumo(selectedInsumo.id!)
                .then(() => setListedInsumos((prevState: ArticuloInsumo[]) => prevState.filter((item: ArticuloInsumo) => item.id !== selectedInsumo.id)))
                
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => setError(error))
                .finally(() => setLoading(false));
        }
    }, [selectedInsumo, setShowDeleteModal, setListedInsumos, setLoading]);

    const onSave = React.useCallback((i: ArticuloInsumo) => {
        if (selectedInsumo){
            setShowSaveModal(false);
            setLoading(true);
            if(i.id){
                DataLayerArticuloInsumo.update.insumo(i)
                    .then((editedInsumo: ArticuloInsumo) => setListedInsumos((prevState: ArticuloInsumo[]) => prevState.map((item: ArticuloInsumo) => item.id === editedInsumo.id ? editedInsumo : item)))
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .catch((error: any) => setError(error))
                    .finally(() => setLoading(false));
            }else {
                //Borrar propiedad id porque es una accion de creacion
                delete i.id;

                DataLayerArticuloInsumo.create.insumo(i)
                    .then((createdInsumo: ArticuloInsumo) => {
                        setListedInsumos((prevState: ArticuloInsumo[]) => [...prevState, createdInsumo]);
                    })
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .catch((error: any) => setError(error))
                    .finally(() => setLoading(false));
            }
        }
    }, [selectedInsumo, setShowSaveModal, setListedInsumos, setLoading]);

    const onShowDeleteModal = React.useCallback((i: ArticuloInsumo) => {
        setSelectedInsumo(i);
        setShowDeleteModal(true);
    }, [setSelectedInsumo, setShowDeleteModal]);

    const onShowSaveModal = React.useCallback((i?: ArticuloInsumo) => {
        setSelectedInsumo(i ??  emptyInsumo);
        setShowSaveModal(true);
    }, [setSelectedInsumo, setShowSaveModal])

    //Render
    if (error){
        return(
            <Alert variant="danger">
                {error?.message || 'Algo fue mal mientras buscaba productos'}
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
                        <Button onClick={() => onShowSaveModal()} style={{ float: 'right', margin: 10, backgroundColor:"#007E00", borderColor:"#007E00"}} >Crear Insumo</Button>
                        <Table striped bordered hover >
                            <thead >
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Precio Compra</th>
                                    <th>Stock Actual</th>
                                    <th>Stock Mínimo</th>
                                    <th>Imagen</th>
                                    {/* <th>Unidad de medida</th>
                                    <th>Rubro</th> */}
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listedInsumos.map((i: ArticuloInsumo) => (
                                        <tr key={i.id}>
                                            <td width='2%'>{i.id}</td>
                                            <td width='23%'>{i.denominacion}</td>
                                            <td width='10%'>{i.precioCompra}</td>
                                            <td width='10%'>{i.stockActual}</td>
                                            <td width='5%'>{i.stockMinimo}</td>
                                            <td width='25%'><img alt={i.urlImagen} src={i.urlImagen} style={{ height: 100, width: 100 }} /></td>
                                            {/* <td width='10%'>{i.unidadMedida.abreviatura}</td>
                                            <td width='15%'>{i.rubroArticuloInsumo.denominacion}</td> */}
                                            <td width='10%' justify-content='space-between'>
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
            <DeleteInsumoModal
                onDelete={onDelete}
                onHide={onCloseDeleteModal}
                insumo = {selectedInsumo}
                show = {showDeleteModal}
            />
            <SaveInsumoModal
                onSave={onSave}
                onHide={onCloseSaveModal}
                insumo = {selectedInsumo}
                show = {showSaveModal}
            />
        </React.Suspense>
    );

};

export default InsumosTable;

