import React from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { format, parseISO } from "date-fns";

import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import makeHttp from "../../utils/http";
import { Token, validateAuth } from "../../utils/auth";
import { Transaction } from '../../utils/model'

import {
    Column,
    IntegratedFiltering,
    IntegratedPaging,
    PagingState,
    SearchState,
    SortingState
} from "@devexpress/dx-react-grid";

import {
    Grid,
    Table,
    TableHeaderRow,
    SearchPanel,
    PagingPanel,
    Toolbar
} from "@devexpress/dx-react-grid-material-ui";
import AddIcon from "@material-ui/icons/Add";


interface TransactionsPageProps {
    transactions: Transaction[];
}

const columns: Column[] = [
    {
        name: 'payment_date',
        title: 'Data pag.',
        getCellValue: (row: any,columnName: string) => {
            console.log(row[columnName].slice(-10));
            return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
        }
    },
    {
        name: 'name',
        title: 'Nome'
    },
    {
        name: 'category',
        title: 'Categoria'
    },
    {
        name: 'type',
        title: 'Operação'
    },
    {
        name: 'created_at',
        title: 'Criado em',
        getCellValue: (row: any,columnName: string) => {
            console.log(row[columnName].slice(-10));
            return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
        }
    }
] 

const TransactionsPage: NextPage<TransactionsPageProps> = (props) => {

    const router = useRouter()
    return (

        <Container>
            <Typography component="h1" variant="h4">
                Minhas transações
            </Typography>
            <Button
                startIcon={<AddIcon />}
                variant={"contained"}
                color="primary"
                onClick={() => router.push("/transactions/new")}
            ></Button>
            <Grid rows={props.transactions} columns={columns} >
                <Table />
                <SortingState defaultSorting={[{columnName: "created_at", direction: "desc"}]}/>
                <SearchState defaultValue="Conta de Água" />
                <PagingState defaultCurrentPage={0} pageSize={5} />
                <TableHeaderRow showSortingControls />
                <IntegratedFiltering />
                <Toolbar />
                <SearchPanel />
                <PagingPanel />
                <IntegratedPaging />
            </Grid>
        </Container>
    )
}

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const auth = validateAuth(ctx.req);

    if(!auth){
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }

    const token = (auth as Token).token;

    const { data: transactions } = await makeHttp(token).get('transactions')

    console.log(token)


    return {
        props: {
            transactions,
        },
    }
}
