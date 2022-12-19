import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CardActionArea } from '@mui/material';
import HandymanIcon from '@mui/icons-material/Handyman';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function RecipeReviewCard({ person }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div>
			<Card sx={{ maxWidth: 280 }}>
				<CardHeader
					
					title={person.name}
					subheader={person.email}
				/>
				<CardActionArea href= {`http://localhost:3000/user/${person.name}`} >
				<CardMedia
					component="img"
					height="194"
					image={process.env.PUBLIC_URL + person.imgPath}
					alt={person.name}
					
				/>
				</CardActionArea>
				<CardContent>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<HandymanIcon />
					</IconButton>
					{/* <IconButton aria-label="share">
						<ShareIcon />
					</IconButton> */}
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<AddCircleIcon />
					</ExpandMore>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>

				</Collapse>
			</Card>
			<br></br>
		</div>
	);
}
