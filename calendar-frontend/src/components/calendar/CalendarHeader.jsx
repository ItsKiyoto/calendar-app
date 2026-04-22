import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '../ui/button';

export default function CalendarHeader({ currentDate, onPrev, onNext, isCurrentMonth, setCurrentMonth }) {

    return (
        <div className="flex items-center justify-between ml-3 mb-6">
            <div>
                <h1 className="text-3xl font-semibold font-serif" >{format(currentDate, 'MMMM yyyy')}</h1>
            </div>
            <div className='flex items-center gap-1' >
                {!isCurrentMonth && (
                    <Button className={'animate-fade-in'} variant="outline" onClick={setCurrentMonth}>
                        Today
                    </Button>
                )}
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