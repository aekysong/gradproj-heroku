import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Star from '@material-ui/icons/Star';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function getKeywords(arr, n) {
  const result = [];

  if (arr.length === 0) {
    return result;
  }

  for (var j = 0; j < n; j++) {
    let max = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > max.length) {
        max = arr[i];
      }
    }
    result.push(max);
    let idx = arr.indexOf(max);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
  }

  return result;
}

export default function UniversityCard(props) {
  // console.log(props);
  const classes = useStyles();

  // satisfaction -> stars
  const stars = [];
  for (var i = 0; i < 5; i++) {
    if (i + 1 <= Math.round(props.data.satisfaction)) {
      stars.push(1);
    } else {
      stars.push(0);
    }
  }

  // keyword parsing
  const keywords = props.data.keyword.split("'");
  const parsedKeywords = []
  for (var j = 0; j < keywords.length; j++) {
    if (keywords[j] !== ', ' && keywords[j] !== '[' && keywords[j] !== ']' && keywords[j] !== '' && keywords[j] !== '[]') {
      parsedKeywords.push(keywords[j]);
    }
  }
  const displayKeywords = getKeywords(parsedKeywords, 3);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => { window.location.href = `/universities/${props.data.id}`; }}>
        <CardMedia
          className={classes.media}
          image={props.data.image_url}
          title={props.data.name}
        />
        <CardContent>
          <Typography>
            {props.data.nation}
          </Typography>
          <Typography gutterBottom variant="h5" component="h3">
            {props.data.name}
          </Typography>
          {displayKeywords.length > 0 ?
            <div>
              {displayKeywords.map((keyword) => {
                return <Typography variant="body2" component="span" style={{ marginRight: 5 }}>
                  #{keyword}
                </Typography>;
              })}
            </div>
            :
            <div></div>
          }
          <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 7 }}>
            {stars.map((star) => {
              if (star === 1) {
                return <Star color="primary" fontSize="small" />;
              } else {
                return <StarBorderOutlined color="disabled" fontSize="small" />;
              }
            })}
            ({props.data.satisfaction})
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
