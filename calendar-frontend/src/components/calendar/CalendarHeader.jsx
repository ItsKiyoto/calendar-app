import {ChevronLeft, ChevronRight} from 'lucide-react';
import {format} from 'date-fns'
import { Button } from '../ui/button';

export default function CalendarHeader({currentDate, onPrev, onNext}){

    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 style={{ fontFamily: 'Lora, serif' }} >{format(currentDate, 'MMMM yyyy')}</h1>
            </div>
            <div>
                <Button variant='ghost' size='icon' onClick={onPrev}>
                    <ChevronLeft></ChevronLeft>
                </Button>
                <Button variant='ghost' size='icon' onClick={onNext}>
                    <ChevronRight></ChevronRight>
                </Button>
            </div>
        </div>
    )
}