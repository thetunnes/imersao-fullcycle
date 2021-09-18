import React from "react";
import { useForm } from "react-hook-form"

import { NextPage } from "next";
import { useRouter } from "next/router";

import makeHttp from "../../utils/http";
import { TransactionCategoryLabels, TransactionTypeLabels } from "../../utils/model";

import {
    Button,
    Container,
    TextField,
    Typography,
    Grid,
    Box,
    MenuItem
} from "@material-ui/core";


const TransactionsNewPage: NextPage = (props) => {

    const { register, handleSubmit } = useForm()
    const router = useRouter()

    async function onSubmit(data: any) {
        try{
            await makeHttp().post('transactions', data)
            router.push('/transactions')
        }catch (e) {
            console.error(e)
        }
    }
    return (

        <Container>
            <Typography component="h1" variant="h4">
                Nova transação
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
            <Grid item xs={12} md={8}>
                <TextField
                {...register("payment_date")}
                type="date"
                required
                label="Data pagamento"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                {...register("name")}
                label="Nome"
                required
                fullWidth
                inputProps={{ maxLength: 255 }}
                />

                <TextField
                {...register("description")}
                label="Descrição"
                required
                fullWidth
                />

                <TextField
                    {...register("category")}
                    select
                    required
                    label="Categoria"
                    fullWidth
                >
              {TransactionCategoryLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>

                <TextField
                {...register("amount", { valueAsNumber: true})}
                required
                type="number"
                label="Valor"
                fullWidth
                />

                <TextField 
                    {...register("type")}
                    select
                    required
                    label="Tipo de operação"
                    fullWidth >
                    {TransactionTypeLabels.map((i, key) => (
                        <MenuItem key={key} value={i.value}>
                            {i.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Box marginTop={2}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                    >
                        Salvar
                    </Button>
                </Box>
            </Grid>
            </Grid>
            </form>
        </Container>
    )
}

export default TransactionsNewPage;
