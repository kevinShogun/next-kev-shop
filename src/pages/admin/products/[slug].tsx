import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { DriveEtaOutlined, EditNoteOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { AdminLayout } from '../../../components/layouts'
import { dbProducts } from '../../../database';
import { IProduct, IType } from '../../../interfaces';
import { tesloApi } from '@/api';
import { Product } from '@/models';
import { useRouter } from 'next/router';


const validTypes = ['shirts', 'pants', 'hoodies', 'hats']
const validGender = ['men', 'women', 'kid', 'unisex']
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

interface FormData {
    _id?: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string[];
    title: string;
    type: string;
    gender: string;
}

interface Props {
    product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product,
    });
    const router = useRouter();

    const [newTagValue, setNewTagValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onChangeSize = (size: string) => {
        const currentSizes = getValues('sizes');

        if(currentSizes.includes(size)){
            return setValue('sizes', currentSizes.filter( s=> s !== size), {shouldValidate: true});
        }

        return setValue('sizes', [...currentSizes, size], {shouldValidate: true});
        
    }


    const onNewTag = () => {
        const tag = newTagValue.trim().toLowerCase();
        const tags = getValues('tags');
        setNewTagValue("");
        if(tags.includes(tag)){
            return;
        }
        tags.push(tag)
        setValue("tags", tags, {shouldValidate: true});
    }

    const onDeleteTag = (tag: string) => {
        setValue("tags", getValues('tags').filter( (t) => t !== tag), {shouldValidate: true})
    }

    const onDeleteImage = (img: string) => {
        setValue(
            'images',
            getValues('images').filter( image => image !== img),
            { shouldValidate: true }
        );
    }

    useEffect(() => {
        const subscription = watch((value, {name, type}) => {
            if(name==='title'){
                const newSlug = value.title?.trim()
                .replaceAll(' ', '_')
                .replaceAll("'", '')
                .toLocaleLowerCase() || '';

                setValue('slug', newSlug);
            }
        })
    
      return () => subscription.unsubscribe();
    }, [watch, setValue])
    

    const onFileSelected = async ({target}: ChangeEvent<HTMLInputElement>) => {
        if(!target.files || target.files.length == 0){
            return;
        }
        try {
            for(const file of target.files){
                const formData = new FormData();
                // console.log(file);
                formData.append('file', file);
                const { data } = await tesloApi.post<{message: string}>('/admin/upload', formData);
                console.log(data.message)
                setValue('images', [...getValues('images'), data.message], {shouldValidate: true})
            }
        } catch (error) {
            console.log(error)
        }
    }


    const onSubmit = async (form: FormData) => {
        if(form.images.length < 2){
            return alert('Mínimo 2 imagenes');
        }
        setIsSaving(true);

        try {
            const {data} = await tesloApi({
                url: "/admin/products",
                method: form._id ?  "PUT" : 'POST',
                data: form
            });

            console.log(data);

            if(!form._id){
                // reload the browser
                router.replace(`/admin/products/${form.slug}`);
            }else{
                setIsSaving(false);
            }
        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }
    }



    return (
        <AdminLayout
            title={'Producto'}
            subtitle={`Editando: ${product.title}`}
            icon={<EditNoteOutlined />}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button
                        color="secondary"
                        startIcon={<SaveOutlined />}
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={isSaving}
                    >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth
                            multiline
                            rows={8}
                            type='text'
                            sx={{ mb: 1, height: 250}}
                            {...register('description', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('inStock', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={!!errors.inStock}
                            helperText={errors.inStock?.message}
                        />

                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('price', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('type')}
                                onChange={({ target }) => {
                                    setValue('type', target.value, { shouldValidate: true });
                                }}
                            >
                                {
                                    validTypes.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('gender')}
                                onChange={({ target }) => {
                                    setValue('gender', target.value, { shouldValidate: true });
                                }}
                            >
                                {
                                    validGender.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel 
                                        key={size} 
                                        control={ <Checkbox checked={getValues('sizes').includes(size)}/> } 
                                        label={size} 
                                        onChange={() => onChangeSize(size)}
                                    />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim().includes(' ') ? 'No pude tener espacios en blanco' : undefined
                            })}
                            error={!!errors.slug}
                            helperText={errors.slug?.message}
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            value={newTagValue}
                            helperText="Presiona [spacebar] para agregar"
                            onChange={(e) => {
                                setNewTagValue(e.target.value)
                            }}
                            onKeyUp={(e) => {
                                if(e.code === 'Space'){
                                    onNewTag();
                                }
                            }}
                        />

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                            component="ul">
                            {
                                getValues('tags').map((tag) => {

                                    return (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={() => onDeleteTag(tag)}
                                            color="primary"
                                            size='small'
                                            sx={{ ml: 1, mt: 1 }}
                                        />
                                    );
                                })}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={<UploadOutlined />}
                                sx={{ 
                                    mb: 3, position: 'relative',
                                    ":hover": {
                                        backgroundColor: 'ActiveCaption'
                                    }
                                }}
                                onClick={() => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                                {/* <input 
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    style={{
                                        opacity: 0,
                                        position: 'absolute',
                                        width: "100%",
                                        height: "100%",
                                        cursor: 'pointer'
                                    }}
                                /> */}
                            </Button>

                            <input 
                                ref={fileInputRef}
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    style={{
                                        display: 'none'
                                    }}
                                    onChange={onFileSelected}
                                />

                            <Chip
                                label="Es necesario al menos 2 imágenes"
                                color='error'
                                variant='outlined'
                                sx={{
                                    display:  getValues('images').length < 2 ? 'flex' : 'none'
                                }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map(img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia
                                                    component='img'
                                                    className='fadeIn'
                                                    image={img}
                                                    alt={img}
                                                />
                                                <CardActions>
                                                    <Button fullWidth color="error"
                                                        onClick={() => onDeleteImage(img)}
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </AdminLayout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { slug = '' } = query;

    let product: IProduct | null;
    if(slug === 'new'){
        const temProduct = JSON.parse(JSON.stringify(new Product()));
        delete temProduct._id;
        temProduct.images = ['img.jpg', 'img2.jpg']

        product = temProduct;
    }else{
        product = await dbProducts.getProductBySlug(slug.toString());
    }


    if (!product) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }


    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage