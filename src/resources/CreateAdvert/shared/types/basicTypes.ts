export type onFinishStep = ({ type, data }: { type: 'StepOne' | 'StepTwo' | 'StepThree'; data: object }) => void;
