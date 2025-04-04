import { useEffect, useState } from 'react';
import AlunoRequest from '../../../fetch/AlunoRequest';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
        


function TabelaAluno() {
    const [alunos, setAlunos] = useState([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;


    useEffect (() => {
        const fetchAlunos = async ()  => {
            try {
                const ListaDeAlunos = await AlunoRequest.listarAlunos();
                setAlunos(ListaDeAlunos);
                console.table(alunos);

                ListaDeAlunos.forEach((e: any) => {
                    e.dataNascimento = new Date(e.dataNascimento).toLocaleDateString('pt-BR');

                    e.celular = e.celular.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
                  });
            } catch (error) {
                console.error(`Erro ao chamar a API: ${error}`);
            }
        }
        fetchAlunos();
    }, [alunos]);

    return (
        <>
            <DataTable value={alunos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
            <Column field="nome" header="Nome" style={{ width: '25%' }}></Column>
            <Column field="sobrenome" header="Sobrenome" style={{ width: '25%' }}></Column>
            <Column field="endereco" header="Endereço" style={{ width: '25%' }}></Column>
            <Column field="email" header="E-mail" style={{ width: '25%' }}></Column>
            <Column field="dataNascimento" header="Data de nascimento" style={{ width: '25%' }}></Column>
            <Column field="celular" header="Celular" style={{ width: '25%' }}></Column>
            </DataTable>
        </>
    )
}

export default TabelaAluno