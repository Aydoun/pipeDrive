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
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;

    if(sourceId === destinationId) {
      return;
    }

    this.props.alterOrder(this.props.userList, sourceId, destinationId);

    console.log(result);
  }

  userClick(userId) {
    this.props.selectUser(this.props.list, userId);
  }

  render() {
    const { list } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {
          list.map((item, index) => {
            return (
              <Droppable droppableId={`${item.id}`} key={item.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                  >
                    <Draggable key={item.id} draggableId={item.id}>
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
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )
          })
        }
      </DragDropContext>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ selectUser }, dispatch),
    alterOrder: (list, sourceId, destinationId) => {
      dispatch({
        type: 'ALTER_USER_ORDER',
        payload: {
          list,
          sourceId,
          destinationId,
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
