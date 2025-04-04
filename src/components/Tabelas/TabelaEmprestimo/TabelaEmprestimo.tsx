import { useEffect, useState } from 'react';
import EmprestimoRequest from '../../../fetch/EmprestimoRequest';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
        


function TabelaEmprestimo() {
    const [emprestimos, setEmprestimos] = useState([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;


    useEffect (() => {
        const fetchEmprestimos = async ()  => {
            try {
                const ListaDeEmprestimos = await EmprestimoRequest.listarEmprestimos();
                setEmprestimos(ListaDeEmprestimos);
                console.table(emprestimos);

                ListaDeEmprestimos.forEach((e: any) => {
                    e.dataEmprestimo = new Date(e.dataEmprestimo).toLocaleDateString('pt-BR');
                    e.dataDevolucao = new Date(e.dataDevolucao).toLocaleDateString('pt-BR');
                  });
            } catch (error) {
                console.error(`Erro ao chamar a API: ${error}`);
            }
        }
        fetchEmprestimos();
    }, [emprestimos]);

    return (
        <>
            <DataTable value={emprestimos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
            <Column field="aluno.nome" header="Aluno" style={{ width: '25%' }}></Column>
            <Column field="livro.titulo" header="Livro" style={{ width: '25%' }}></Column>
            <Column field="dataEmprestimo" header="Data empréstimo" style={{ width: '25%' }}></Column>
            <Column field="dataDevolucao" header="Data devolução" style={{ width: '25%' }}></Column>
            <Column field="statusEmprestimo" header="Status empréstimos" style={{ width: '25%' }}></Column>
            </DataTable>
        </>
    )
}

export default TabelaEmprestimo