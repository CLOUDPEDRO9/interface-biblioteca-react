import { useEffect, useState } from 'react';
import LivroRequest from '../../../fetch/LivroRequest';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
        


function TabelaLivro() {
    const [livros, setLivros] = useState([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;


    useEffect (() => {
        const fetchLivros = async ()  => {
            try {
                const ListaDeLivros = await LivroRequest.listarLivros();
                setLivros(ListaDeLivros);
                console.table(livros);

                ListaDeLivros.forEach((l: any) => {
                    l.valorAquisicao = Number(l.valorAquisicao).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                });
            } catch (error) {
                console.error(`Erro ao chamar a API: ${error}`);
            }
        }
        fetchLivros();
    }, [livros]);

    return (
        <>
            <DataTable value={livros} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
            <Column field="titulo" header="Titulo" style={{ width: '25%' }}></Column>
            <Column field="autor" header="Autor" style={{ width: '25%' }}></Column>
            <Column field="editora" header="Editora" style={{ width: '25%' }}></Column>
            <Column field="isbn" header="ISBN" style={{ width: '25%' }}></Column>
            <Column field="valorAquisicao" header="Valor de aquisição" style={{ width: '25%' }}></Column>
            </DataTable>
        </>
    )
}

export default TabelaLivro