import { Box, Button, createStyles, makeStyles, MenuItem, TextField, Theme, Typography } from '@material-ui/core'
import React, { ChangeEvent, FC, SetStateAction } from 'react'
import { useSelector } from 'react-redux';
import { selectCategories } from '../../redux/selectors';
import { checkImage } from '../../utils/ImageUpload';
import { Input, InputStyled } from '../Input'
import { SubmitButton } from '../SubmitBtn'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {

    },
    button: {
      padding: theme.spacing(1, 4, 1, 4),
      cursor: 'pointer',
    },
    input: {
      marginTop: theme.spacing(1),
      '& .MuiFormHelperText-root': {
        textAlign: 'right',
        marginRight: theme.spacing(1),
      },
    },
    fileInput: {
      marginBottom: 0,
    }
  }),
);

type CreateFormProps = {
  formik: any;
}

export const CreateForm: FC<CreateFormProps> = ({ formik }) => {
  const classes = useStyles();
  const categories = useSelector(selectCategories);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const message = checkImage(file);
      if (message) {
        formik.setFieldError('thumbnail', message);
        formik.setErrors({ thumbnail: message });
      }
      formik.setFieldValue('thumbnail', file);
    }
  }

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <InputStyled title="Заголовок статьи" inputTitle="">
        <Input
          formik={formik}
          label=""
          name="title"
          type="text"
          autoComplete="current-password"
          className={classes.input}
        />
      </InputStyled>
      <Box mt={4}>
        <InputStyled title="Превью" inputTitle="">
          <Button
            variant="contained"
            fullWidth
            component="label"
          >
            {formik.values.thumbnail ? formik.values.thumbnail?.name : 'Загрузите фото'}
            <input
              name="thumbnail"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              hidden
            />
          </Button>
        </InputStyled>
        <Typography align="right" variant="caption" color="error" component="p">
          {formik.touched.thumbnail && formik.errors.thumbnail ? formik.errors.thumbnail : null}
        </Typography>
      </Box>

      <InputStyled title="Описание" inputTitle="">
        <Input
          formik={formik}
          label="Введите краткое описание"
          multiline
          name="description"
          className={classes.input}
          rows={6}
          fullWidth
        />
      </InputStyled>

      <TextField
        select
        label="Выберите категорию"
        name="category"
        fullWidth
        value={formik.values['category']}
        onChange={formik.handleChange}
        variant="outlined"
        error={!!formik.errors['category'] && !!formik.touched['category']}
        helperText={formik.touched['category'] && formik.errors['category'] ? formik.errors['category'] : null}
      >
        {console.log("categoriescategoriescategories", categories)}
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.name}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>

      <Box display="flex" justifyContent="flex-end" pb={4} mt={2} mr={2}>
        <SubmitButton
          className={classes.button}
          color="primary"
          fullWidth={false}
          title={"Сохранить"}
        />
      </Box>
    </form>
  )
}
