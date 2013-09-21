describe('SimuAPN', function() {

    describe('La section des objectifs', function() {

        beforeEach(function() {
            browser().navigateTo('/');
        });

        it('doit afficher les informations de l\'objectif sélectionné', function() {
            // Given
            expect(repeater('select option').count()).toBe(4);
            expect(element('#objectif-details').css('display')).toBe('none');
            
            //When
            select('model.selected').option('14mm f/2.8');
            
            // Then
            expect(element('#objectif-details').css('display')).toBe('block');
            expect(element('#nom').text()).toEqual('14mm f/2.8');
            expect(element('#focale').text()).toEqual('14');
            expect(element('#ouvertureMin').text()).toEqual('2.8');
            expect(element('#vr').text()).toEqual('false');
            expect(element('#resolution').text()).toEqual('0');
            expect(element('#ac').text()).toEqual('0');
        });
    });
});