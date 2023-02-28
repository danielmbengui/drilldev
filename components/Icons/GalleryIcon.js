import CollectionsIcon from '@mui/icons-material/Collections';

export const GalleryIcon = ({color, size, fill, width = 24, height = 24, ...props}) => {
    return (
      <CollectionsIcon 
        //color={'black'}
        //size='large'
        sx={{
            color:color
        }}
      />
    );
  };
  