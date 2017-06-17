import handleAction from '../src/handleAction'

describe('handleAction Tests', () => {
    
    test('should handle standard action', () => {
        let action = { type: "TEST_ACTION" }
        let dispatch = jest.fn()

        handleAction(action, dispatch)

        expect(dispatch).toBeCalledWith({ type: "TEST_ACTION" })
        expect(dispatch.mock.calls.length).toEqual(1)
    })

    test('should handle action creator', () => {
        let actionCreator = () => ({ type: "TEST_ACTION" })
        let dispatch = jest.fn()

        handleAction(actionCreator, dispatch)

        expect(dispatch).toBeCalledWith({ type: "TEST_ACTION" })
        expect(dispatch.mock.calls.length).toEqual(1)
    })

    test('should handle action creator with props', () => {
        let actionCreator = ({ message }) => ({ type: "TEST_ACTION", message })
        let dispatch = jest.fn()

        handleAction(actionCreator, dispatch, { message: "test" })

        expect(dispatch).toBeCalledWith({ type: "TEST_ACTION", message: "test" })
        expect(dispatch.mock.calls.length).toEqual(1)
    })

    test('should handle array of actions', () => {
        let actions = [{ type: "TEST_ACTION_1" }, { type: "TEST_ACTION_2" }]
        let dispatch = jest.fn()

        handleAction(actions, dispatch)

        expect(dispatch).toBeCalledWith({ type: "TEST_ACTION_1" })
        expect(dispatch).toBeCalledWith({ type: "TEST_ACTION_2" })
        expect(dispatch.mock.calls.length).toEqual(2)
    })

    test('should handle array of action creators', () => {
        let actionCreator1 = () => ({ type: "TEST_ACTION_1" })
        let actionCreator2 = () => ({ type: "TEST_ACTION_2" })
        let actions = [actionCreator1, actionCreator2]
        let dispatch = jest.fn()

        handleAction(actions, dispatch)

        expect(dispatch).toBeCalledWith({ type: "TEST_ACTION_1" })
        expect(dispatch).toBeCalledWith({ type: "TEST_ACTION_2" })
        expect(dispatch.mock.calls.length).toEqual(2)
    })
})