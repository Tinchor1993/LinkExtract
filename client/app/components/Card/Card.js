import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const styles = {
  card: {
    maxWidth: 250,
    padding: 10
  },
  media: {
    objectFit: 'cover',
  },
  date: {
    color: 'gray',
    textAlign: 'right'
  }
};

function MediaCard(props) {
  const { classes, card_data, selected } = props;
  const title = card_data.title.replace(selected, `<mark>${selected}</mark>`);
  const description = card_data.description.replace(selected, `<mark>${selected}</mark>`);

  const epochTime = new Date(card_data.date);
  return (
    <Card className={classes.card}>
      {(card_data.image === null) ? '': (
        <CardMedia
          component="img"
          alt="Prev Image"
          className={classes.media}
          height="140"
          image= {card_data.image}
          title="Contemplative Reptile"
        />
      )}
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          { ReactHtmlParser(title) }
        </Typography>
        <Typography component="p">
          { ReactHtmlParser(description) }
        </Typography>
      </CardContent>
      <Typography component="p" className={classes.date}>
        {(epochTime === null) ? '':`${epochTime.getUTCMonth()}/${epochTime.getUTCDay()}/${epochTime.getUTCFullYear()}`}
      </Typography>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
