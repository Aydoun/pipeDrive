import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { selectUser } from '../../actions/users';
import ListItem from '../listItem/';
import { initials } from '../../utils/';
import { apiMapping } from '../../utils/config';

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
});

class DND extends Component {
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
    this.userClick = this.userClick.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const destinationIdx = result.destination.index;
    const draggableId = result.draggableId;

    this.props.alterOrder(destinationIdx, draggableId);
  }

  userClick(userId) {
    this.props.selectUser(this.props.list, userId);
  }

  render() {
    const { list } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >
              {
                list.map((item, index) => {
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ListItem
                            userName={item.name}
                            userInitials={initials(item.first_name, item.last_name)}
                            userLocation={item[apiMapping.Location]}
                            onUserClick={() => this.userClick(item.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  )
                })
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ selectUser }, dispatch),
    alterOrder: (destinationIdx, draggableId) => {
      dispatch({
        type: 'ALTER_USER_ORDER',
        payload: {
          destinationIdx,
          draggableId,
        }
      });
    },
  };
}

function mapStateToProps(state) {
  return {
    userList: state.users.userList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DND);
